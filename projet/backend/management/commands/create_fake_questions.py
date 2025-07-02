import random
from django.core.management.base import BaseCommand
from faker import Faker
from backend.models import Question, CustomUser

class Command(BaseCommand):
    help = 'Create fake questions'

    def handle(self, *args, **kwargs):
        faker = Faker()
        users = list(CustomUser.objects.all())

        if not users:
            self.stdout.write(self.style.ERROR('No users found. Please create some users before generating fake questions.'))
            return

        for _ in range(50):  # Change this number to create more or fewer questions
            Question.objects.create(
                titre=faker.sentence(nb_words=6),
                type=random.choice(['type1', 'type2', 'type3']),
                contenu=faker.paragraph(nb_sentences=5),
                auteur=random.choice(users),
                reply=0,
                recommendations=0,
                views=0,
                followers=0
            )
        self.stdout.write(self.style.SUCCESS('Successfully created fake questions'))
