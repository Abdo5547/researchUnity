from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from faker import Faker
import random
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Generate fake data for CustomUser model'

    def handle(self, *args, **kwargs):
        CustomUser = get_user_model()
        fake = Faker()

        num_users = 100
        default_male_image = os.path.join(settings.MEDIA_ROOT, 'uploads/images/profile_male.jpg')
        default_female_image = os.path.join(settings.MEDIA_ROOT, 'uploads/images/profile_female.png')

        users = []
        emails = set()  # To ensure unique emails

        for i in range(num_users):
            gender = random.choice(['Male', 'Female'])
            image = default_male_image if gender == 'Male' else default_female_image

            # Ensure unique email addresses by appending an index
            email = f"user{i}@example.com"
            while email in emails:
                i += 1
                email = f"user{i}@example.com"
            emails.add(email)

            user = CustomUser(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=email,
                image=image,
                institution=fake.company(),
                faculte=fake.word(),
                departement=fake.word(),
                degree=fake.word(),
                region=fake.word(),
                gender=gender,
                keywords=fake.words(),
                is_active=True,
                is_staff=False,
                is_verified=True,
                is_superuser=False,
                online=False,
            )
            users.append(user)
        
        CustomUser.objects.bulk_create(users)
        self.stdout.write(self.style.SUCCESS('Successfully generated fake data for CustomUser model with default images.'))
