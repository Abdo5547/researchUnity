from rest_framework import serializers,generics,status
from .models import CustomUser, Doctorate, FollowingPublication, FollowingQuestion, Messages, Professor, Projet , Publication, Question, Commentaire, RecommendedPublication, RecommendedQuestion, Reponse, Auteur, SavedPublication
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'





class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'first_name', 'last_name', 'email', 'password', 'institution',
            'faculte', 'departement', 'degree', 'region', 'keywords', 'gender'
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def create(self, validated_data):
        degree = validated_data.get('degree')

        if degree == 'Professor':
            user = Professor(
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                institution=validated_data.get('institution'),
                faculte=validated_data.get('faculte'),
                departement=validated_data.get('departement'),
                degree=degree,
                region=validated_data.get('region'),
                keywords=validated_data.get('keywords'),
                gender=validated_data.get('gender'),
            )
        elif degree == 'PHDstudent':
            user = Doctorate(
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                institution=validated_data.get('institution'),
                faculte=validated_data.get('faculte'),
                departement=validated_data.get('departement'),
                degree=degree,
                region=validated_data.get('region'),
                keywords=validated_data.get('keywords'),
                gender=validated_data.get('gender'),
            )
        else:
            user = CustomUser(
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                institution=validated_data.get('institution'),
                faculte=validated_data.get('faculte'),
                departement=validated_data.get('departement'),
                degree=degree,
                region=validated_data.get('region'),
                keywords=validated_data.get('keywords'),
                gender=validated_data.get('gender'),
            )

        user.set_password(validated_data['password'])
        user.save()
        return user
    





class CustomUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'image']





class selfSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"


class CreatePublicationSerializer(serializers.ModelSerializer):
    auteurs_noms = serializers.ListField(
        child=serializers.ListField(
            child=serializers.CharField(),
            min_length=2,
            max_length=2
        ),
        required=False
    )
    document = serializers.FileField(required=True)

    class Meta:
        model = Publication
        fields = ['type', 'titre', 'doi', 'auteurs_noms', 'document', 'keywords']

    def create(self, validated_data):
        auteurs_noms = validated_data.pop('auteurs_noms', [])
        document = validated_data.pop('document')

        publication = Publication.objects.create(**validated_data)
        publication.document.save(document.name, document)

        for nom in auteurs_noms:
            user = CustomUser.objects.get(first_name=nom[0], last_name=nom[1] )
            publication.auteurs.add(user)

        return publication

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class PublicationSerializer(serializers.ModelSerializer):
    auteurs = AuthorSerializer(many=True, read_only=True)
    mainAuteur = AuthorSerializer(read_only=True)

    class Meta:
        model = Publication
        fields = ('id', 'titre', 'date', 'auteurs', 'mainAuteur','type','vues','citations_count','date','document')
    
class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentaire
        fields = ['id', 'publication', 'auteur', 'contenu', 'date', 'reply']

class QuestionSerializer(serializers.ModelSerializer):
    auteur = CustomUserSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ['titre', 'contenu', 'type', 'auteur']


class QuestionListSerializer(serializers.ModelSerializer):
    auteur = CustomUserSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ['id','titre', 'contenu', 'type', 'auteur', 'document', 'date', 'reply', 'recommendations', 'views', 'followers']



class RecommendedQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendedQuestion
        fields = '__all__'



class FollowingQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowingQuestion
        fields = '_all_'



class PublicationRefSerializer(serializers.ModelSerializer):
    references = serializers.SerializerMethodField()
    auteurs = CustomUserSerializer(many=True)
    cited_pub = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = [
            'id', 'document', 'titre', 'date', 'likes', 'vues', 'keywords', 'doi', 
            'citations_count', 'reference_count', 'references', 'auteurs', 
            'type', 'mainAuteur', 'cited_pub'
        ]

    def get_references(self, obj):
        return [{'id': ref.id, 'titre': ref.titre} for ref in obj.references.all()]

    def get_cited_pub(self, obj):
        return [{'id': ref.id, 'titre': ref.titre} for ref in obj.cited_pub.all()]




class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'




class ReponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reponse
        fields = ['id', 'contenu', 'auteur', 'date', 'reply']

        
class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Messages
        fields = ['id', 'sender', 'date', 'content']

    def get_sender(self, obj):
        # Récupérer l'utilisateur authentifié
        user = self.context['request'].user
        
        # Vérifier si l'utilisateur authentifié est l'expéditeur du message
        if user == obj.sender:
            return {"first_name": "you", "last_name": ""}
        
        # Sinon, renvoyer le nom réel de l'expéditeur
        return {"first_name": obj.sender.first_name, "last_name": obj.sender.last_name} if obj.sender else None

class ProjetSerializer(serializers.ModelSerializer):
    membres = AuthorSerializer(many=True, read_only=True)
    membres_ids = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True, write_only=True)
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Projet
        fields = ['titre', 'contenu', 'membres', 'membres_ids', 'messages','id']

    def get_messages(self, obj):
        messages = Messages.objects.filter(groupe=obj)
        return MessageSerializer(messages, many=True, context=self.context).data

    def create(self, validated_data):
        membres_data = validated_data.pop('membres_ids')
        projet = Projet.objects.create(**validated_data)
        projet.membres.set(membres_data)
        # Créer un message initial pour le projet
        Messages.objects.create(
            groupe=projet,
            sender=projet.responsable,
            content="We are excited to have you join our community and look forward to achieving great things together!"
        )
        return projet
    




class SavedPublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPublication
        fields = '__all__'


class FollowingPublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowingPublication
        fields = '__all__'


class RecommendedPublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendedPublication
        fields = '__all__'

class ReponseSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Reponse
        fields = ['id', 'contenu', 'question_id']

