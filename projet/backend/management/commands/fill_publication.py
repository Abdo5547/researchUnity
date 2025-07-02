import random
from django.core.management.base import BaseCommand
from faker import Faker
from backend.models import Publication, CustomUser
from django.core.files import File
from django.core.files.images import ImageFile
from django.conf import settings

# Types de publications et mots-clés (adaptés depuis vos exportations)
publicationTypes = [
    'Article', 'Book', 'Chapter', 'Code', 'Conference Paper', 'Cover Page', 
    'Data', 'Experiment Findings', 'Method', 'Negative Results', 'Patent', 
    'Poster', 'Preprint', 'Presentation', 'Raw Data', 'Research Proposal', 
    'Technical Report', 'Thesis', 'Research'
]

keywords = [
    ["HTML", "CSS", "JavaScript", "Front-end", "Back-end", "CMS", "PHP", "Node.js", "React", "Angular", "Vue.js", "Django", "REST", "GraphQL"],
    ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis"],
    ["TCP/IP", "HTTP/HTTPS", "VPN", "Firewall", "Cryptographie", "SSL/TLS", "Injection SQL"],
    ["Windows", "Linux", "MacOS", "Unix", "Shell", "Processus", "Système de fichiers", "Permissions"],
    ["Machine Learning", "Deep Learning", "Réseaux de neurones", "NLP", "Vision par ordinateur", "Data Mining", "Big Data", "Pandas", "NumPy", "SciPy", "TensorFlow", "PyTorch", "Keras"],
    ["AWS", "Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Terraform", "Microservices", "CI/CD", "Monitoring", "Logging"],
    ["IoT", "Blockchain", "Cryptomonnaie", "Réalité virtuelle", "Réalité augmentée", "Edge computing", "Quantum computing"],
    ["Mécanique quantique", "Relativité", "Physique des particules", "Astrophysique", "Thermodynamique", "Électromagnétisme", "Optique", "Acoustique", "Physique statistique"],
    ["Biologie moléculaire", "Génétique", "Biotechnologie", "Écologie", "Biologie cellulaire", "Physiologie", "Évolution", "Microbiologie", "Biochimie"],
    ["Anatomie", "Physiologie", "Pharmacologie", "Pathologie", "Microbiologie", "Chirurgie", "Neurologie", "Cardiologie", "Oncologie", "Pédiatrie"],
    ["Algèbre", "Analyse", "Géométrie", "Probabilités", "Statistiques", "Calcul différentiel", "Calcul intégral", "Théorie des nombres", "Logique mathématique", "Théorie des ensembles"],
    ["Chimie organique", "Chimie inorganique", "Chimie physique", "Chimie analytique", "Chimie des matériaux", "Catalyse", "Chimie quantique", "Spectroscopie", "Réactions chimiques"]
]

class Command(BaseCommand):
    help = 'Generate fake data for Publication model'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Obtenir tous les utilisateurs existants
        users = list(CustomUser.objects.all())

        def create_fake_publication():
            type = random.choice(publicationTypes)
            titre = fake.sentence(nb_words=6)
            doi = fake.isbn13()
            keywords_choice = random.choice(keywords)
            selected_keywords = random.sample(keywords_choice, k=min(len(keywords_choice), random.randint(1, 5)))
            
            # Créer la publication
            main_auteur = random.choice(users)

            publication = Publication(
                type=type,
                titre=titre,
                doi=doi,
                keywords=selected_keywords,
                mainAuteur=main_auteur

            )
            publication.save()
            
            # Ajouter des auteurs à la publication
            auteurs = random.sample(users, k=random.randint(1, 8))  # Choisir de 1 à 3 auteurs au hasard
            for auteur in auteurs:
                publication.auteurs.add(auteur)
            
            # Ajouter une image pour l'auteur principal
            main_auteur = random.choice(users)
            return publication

        num_publications = 20   # Nombre de publications à générer

        for _ in range(num_publications):
            create_fake_publication()

        self.stdout.write(self.style.SUCCESS('Successfully generated fake data for Publication model.'))