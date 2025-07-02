import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='media/uploads/images', blank=True, null=True)
    institution = models.CharField(max_length=255, blank=True)
    faculte = models.CharField(max_length=255, blank=True)
    departement = models.CharField(max_length=255, blank=True)
    degree = models.CharField(max_length=255, blank=True)
    region = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=100, blank=True)
    keywords = models.CharField(max_length=1000, blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    online = models.BooleanField(default=False)
    projets = models.ManyToManyField('Projet', related_name='participants')
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def _str_(self):
        return self.email


    @property
    def is_admin(self):
        return self.is_staff
    
    def get_followers(self):
        return self.followerships.all()



class Follow(models.Model):
    follower = models.ForeignKey(CustomUser, related_name='followed_users', on_delete=models.CASCADE)
    followed_user = models.ForeignKey(CustomUser, related_name='followerships', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'followed_user')

class Professor(CustomUser):
    pass

    def _str_(self):
        return self.user.email



class Doctorate(CustomUser):
    pass

    def __str__(self):
        return self.email  # Fix __str__ method
    

@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.degree == "PHDstudent":
            Doctorate.objects.create(user=instance)
        elif instance.degree == "Professor":
            Professor.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if instance.degree == "PHDstudent":
        instance.doctorant.save()
    elif instance.degree == "Professor":
        instance.professor.save()

CustomUser = get_user_model()

class Publication(models.Model):
    document = models.FileField(upload_to='media/documents/')
    titre = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    vues = models.PositiveIntegerField(default=0)
    recommendations = models.PositiveIntegerField(default=0)
    following = models.PositiveIntegerField(default=0)
    saving = models.PositiveIntegerField(default=0)
    keywords = models.JSONField(default=list)
    doi = models.CharField(max_length=255, unique=True, default='')
    citations_count = models.PositiveIntegerField(default=0)    #compteur nbr
    reference_count = models.PositiveIntegerField(default=0)
    cited_pub = models.ManyToManyField('self', through='Citation', symmetrical=False, related_name='cited_by')
    references = models.ManyToManyField('self', through='Reference', symmetrical=False, related_name='referred_by')        
    auteurs = models.ManyToManyField(CustomUser, through='Auteur', related_name='publications')
    type = models.CharField(max_length=50, default='')
    mainAuteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_publications', null=True, blank=True)

    def _str_(self):
        return self.titre
    def increment_citations(self):
        self.citations_count += 1
        self.save()

    def increment_references(self):
        self.reference_count += 1
        self.save()

    def add_like(self):
        self.likes += 1
        self.save()

    def add_vue(self):
        self.vues += 1
        self.save()

    def increment_followers(self, user):
        self.following += 1
        self.save()
        FollowingPublication.objects.create(user=user, publication=self)

    def decrement_followers(self, user):
        if self.following > 0:
            self.following -= 1
            self.save()
            FollowingPublication.objects.filter(user=user, publication=self).delete()

    def increment_recommendations(self, user):
        self.recommendations += 1
        self.save()
        RecommendedPublication.objects.create(user=user, publication=self)

    def decrement_recommendations(self, user):
        if self.recommendations > 0:
            self.recommendations -= 1
            self.save()
            RecommendedPublication.objects.filter(user=user, publication=self).delete()

    def increment_saved(self, user):
        self.saving += 1
        self.save()
        SavedPublication.objects.create(user=user, publication=self)

    def decrement_saved(self, user):
        if self.saving > 0:
            self.saving -= 1
            self.save()
            SavedPublication.objects.filter(user=user, publication=self).delete()


class SavedPublication(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='saved_publications')
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE, related_name='saved_by_users')
    saved_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.user.email} saved {self.publication.titre}"

class FollowingPublication(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)

    def _str_(self):
        return f"{self.user.email} follows {self.publication.titre}"

class RecommendedPublication(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)

    def _str_(self):
        return f"{self.user.email} recommends {self.publication.titre}"



class Citation(models.Model):
    citing_publication = models.ForeignKey(Publication, related_name='citing_citations', on_delete=models.CASCADE, default=None)
    cited_publication = models.ForeignKey(Publication, related_name='cited_citations', on_delete=models.CASCADE , default=None)
    date = models.DateTimeField(default=datetime.datetime.now)

    def _str_(self):
        return f"'{self.citing_publication.titre}' cites '{self.cited_publication.titre}'"
    
class Reference(models.Model):
    citing_publication = models.ForeignKey(Publication, related_name='citing_references', on_delete=models.CASCADE, default=None)
    cited_publication = models.ForeignKey(Publication, related_name='cited_references', on_delete=models.CASCADE, default=None)
    date = models.DateTimeField(default=datetime.datetime.now)

    def _str_(self):
        return f"'{self.citing_publication.titre}' references '{self.cited_publication.titre}'"

class Auteur(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE, default=None)

    def _str_(self):
        return f"{self.user.first_name} {self.user.last_name}"

class Commentaire(models.Model):
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE, related_name='commentaires')
    auteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='commentaires_ecrits')
    contenu = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

    def _str_(self):
        return f"Commentaire de {self.auteur.first_name} {self.auteur.last_name} le {self.date.strftime('%Y-%m-%d %H:%M:%S')}: {self.contenu}"

class Question(models.Model):
    titre = models.CharField(max_length=200)
    type = models.CharField(max_length=50, default='')
    document = models.FileField(upload_to='media/documents/', default=None)
    contenu = models.TextField()
    auteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='questions_postees', null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    reply = models.PositiveIntegerField(default=0)
    recommendations = models.PositiveIntegerField(default=0)
    views = models.PositiveIntegerField(default=0)
    followers = models.PositiveIntegerField(default=0)

    def _str_(self):
        return self.titre
    
    def increment_views(self):
        self.views += 1
        self.save()
    
    def increment_recommendations(self, user):
        self.recommendations += 1
        self.save()
        RecommendedQuestion.objects.create(user=user, question=self)

    def increment_followers(self, user):
        self.followers += 1
        self.save()
        FollowingQuestion.objects.create(user=user, question=self)

    def decrement_recommendations(self, user):
        if self.recommendations > 0:
            self.recommendations -= 1
            self.save()
            RecommendedQuestion.objects.filter(user=user, question=self).delete()

    def decrement_followers(self, user):
        if self.followers > 0:
            self.followers -= 1
            self.save()
            FollowingQuestion.objects.filter(user=user, question=self).delete()

class RecommendedQuestion(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='recommended_questions')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='recommended_by')

    def _str_(self):
        return f"{self.user.username} recommended {self.question.titre}"


class FollowingQuestion(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='following_questions')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='followed_by')

    def _str_(self):
        return f"{self.user.username} follows {self.question.titre}"

class Reponse(models.Model):
    contenu = models.TextField()
    auteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reponses_faites')
    date = models.DateTimeField(auto_now_add=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='reponses')
    reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

    def _str_(self):
        return f"Reponse à la question '{self.question.titre}'"
    

class Projet(models.Model):
    titre = models.CharField(max_length=200)
    contenu = models.TextField()
    responsable = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='projets_diriges')
    membres = models.ManyToManyField(CustomUser, related_name='projets_participes')
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)

    def _str_(self):
        return self.titre

class Messages(models.Model):
    groupe = models.ForeignKey(Projet, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    online = models.BooleanField(default=False)

    def _str_(self):
        return f"Message from {self.sender} on {self.date}"