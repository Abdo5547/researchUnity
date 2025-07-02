from datetime import datetime, timedelta
import jwt
from django.utils import timezone
from rest_framework import status, generics,permissions
from rest_framework.views import APIView
from django.db.models import Q, Count
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.exceptions import AuthenticationFailed
from .models import Follow, FollowingPublication, FollowingQuestion, Messages, Projet, Publication, CustomUser, Commentaire, Question, RecommendedPublication, RecommendedQuestion, Reference, Reponse, Citation, SavedPublication
from .serializers import AuthorSerializer, CreatePublicationSerializer, CustomUserSerializer, FollowingPublicationSerializer, FollowingQuestionSerializer, MessageSerializer,  ProjetSerializer, PublicationRefSerializer, PublicationSerializer, QuestionListSerializer, RecommendedPublicationSerializer, RecommendedQuestionSerializer, SavedPublicationSerializer,UserSerializer, selfSerializer, QuestionSerializer,CommentaireSerializer, ReponseSerializer
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from rapidfuzz import fuzz






#signup
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=201)
        return Response(serializer.errors, status=400)
    






#signin 
class SigninView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        
        # Verify if the user exists
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Invalid email redentials'}, status=400)
        
        # Check if the password is correct
        if check_password(password, user.password):
            
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'message': 'Invalid paswrodds credentials'}, status=400)

#userdetails
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AuthorSerializer




class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user 
        serializer = selfSerializer(user)
        return Response(serializer.data)

class CustomAuthenticatedView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):  
        user = request.user
        return Response({"message": f"Welcome, {user.username}!"})    



class FollowersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        followers = user.followers.all()
        serializer = CustomUserSerializer(followers, many=True)
        return Response(serializer.data)


class CreatePublicationView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = CreatePublicationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(mainAuteur=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PublicationListView(generics.ListAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer




# middleware.py

from django.utils.deprecation import MiddlewareMixin



class DownloadDocumentAPIView(APIView):
    
    def get(self, request, pk):
        
        publication = get_object_or_404(Publication, pk=pk)
        try:
            publication.add_vue()
            file_path = publication.document.path

            return FileResponse(open(file_path, 'rb'), as_attachment=True)
        
        except FileNotFoundError:
            return Response({"message": "Document not found"}, status=404)



class PublicationDetailView(generics.RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer  

class QuestionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = QuestionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(auteur=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionListSerializer
    permission_classes = [IsAuthenticated]
    


class CreateFollowingQuestionView(generics.CreateAPIView):
    queryset = FollowingQuestion.objects.all()
    serializer_class = FollowingQuestionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        question_id = request.data.get('question_id')
        question = Question.objects.get(id=question_id)
        question.increment_followers(request.user)
        return Response({'status': 'following'}, status=status.HTTP_201_CREATED)

class CreateRecommendedQuestionView(generics.CreateAPIView):
    queryset = RecommendedQuestion.objects.all()
    serializer_class = RecommendedQuestionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        question_id = request.data.get('question_id')
        question = Question.objects.get(id=question_id)
        question.increment_recommendations(request.user)
        return Response({'status': 'recommended'}, status=status.HTTP_201_CREATED)
    
class DeleteFollowingQuestionView(generics.DestroyAPIView):
    queryset = FollowingQuestion.objects.all()
    serializer_class = FollowingQuestionSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        question_id = request.data.get('question_id')
        question = Question.objects.get(id=question_id)
        question.decrement_followers(request.user)
        return Response({'status': 'unfollowed'}, status=status.HTTP_204_NO_CONTENT)

class DeleteRecommendedQuestionView(generics.DestroyAPIView):
    queryset = RecommendedQuestion.objects.all()
    serializer_class = RecommendedQuestionSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        question_id = request.data.get('question_id')
        question = Question.objects.get(id=question_id)
        question.decrement_recommendations(request.user)
        return Response({'status': 'unrecommended'}, status=status.HTTP_204_NO_CONTENT)

class ListFollowingQuestionsView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        following_questions = FollowingQuestion.objects.filter(user=self.request.user)
        question_ids = following_questions.values_list('question_id', flat=True)
        return Question.objects.filter(pk__in=question_ids)

class ListRecommendedQuestionsView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        recommended_questions = RecommendedQuestion.objects.filter(user=self.request.user)
        question_ids = recommended_questions.values_list('question_id', flat=True)
        return Question.objects.filter(pk__in=question_ids)

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user



class CommentaireCreateView(generics.CreateAPIView):
    queryset = Commentaire.objects.all()
    serializer_class = CommentaireSerializer
    def perform_create(self, serializer):
        serializer.save(auteur=self.request.user)


class ReponseCreateView(generics.CreateAPIView):
    queryset = Reponse.objects.all()
    serializer_class = ReponseSerializer
    def perform_create(self, serializer):
        serializer.save(auteur=self.request.user)

class SearchView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query:
            publications = Publication.objects.filter(titre__icontains=query)
            questions = Question.objects.filter(titre__icontains=query)
            users = CustomUser.objects.filter(Q(first_name__icontains=query) | Q(last_name__icontains=query))

            publication_serializer = PublicationSerializer(publications, many=True)
            question_serializer = QuestionSerializer(questions, many=True)
            user_serializer = CustomUserSerializer(users, many=True)

            data = {
                'publications': publication_serializer.data,
                'questions': question_serializer.data,
                'users': user_serializer.data,
            }
            return Response(data)
        return Response({'error': 'No query provided'}, status=status.HTTP_400_BAD_REQUEST)




class ProjetCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        titre = data.get('titre')
        contenu = data.get('contenu')
        membres_ids = data.get('membres')

        if not titre or not contenu or not membres_ids:
            return Response({"message": "Veuillez fournir le titre, le contenu, le responsable et les membres du projet."}, status=status.HTTP_400_BAD_REQUEST)

        responsable = request.user

        projet = Projet.objects.create(
            titre=titre,
            contenu=contenu,
            responsable=responsable,
            start_date=timezone.now(),
            end_date=None
        )

        membres = CustomUser.objects.filter(id__in=membres_ids)
        projet.membres.add(*membres)

        # Créer des messages pour le projet
        messages_data = data.get('messages', [])
        for message_data in messages_data:
            content = message_data.get('content')
            date = message_data.get('date') or timezone.now()
            # Créer et enregistrer le message
            message = Messages.objects.create(
                groupe=projet,
                sender=responsable,
                date=date,
                content=content
            )

        projet_serializer = ProjetSerializer(projet)
        return Response(projet_serializer.data, status=status.HTTP_201_CREATED)
    

class CreateMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        sender = request.user
        groupe_id = data.get('groupe_id')  # Supposons que vous envoyez l'ID du groupe avec les données du message
        content = data.get('content')

        if not groupe_id or not content:
            return Response({"message": "Veuillez fournir l'ID du groupe et le contenu du message."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            groupe = Projet.objects.get(id=groupe_id)
        except Projet.DoesNotExist:
            return Response({"message": "Le groupe spécifié n'existe pas."}, status=status.HTTP_400_BAD_REQUEST)

        # Créer le message
        message = Messages.objects.create(
            groupe=groupe,
            sender=sender,
            date=timezone.now(),
            content=content
        )

        message_serializer = MessageSerializer(message)
        return Response(message_serializer.data, status=status.HTTP_201_CREATED)
    


class UserProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        projets = Projet.objects.filter(responsable=user)
        serializer = ProjetSerializer(projets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        projets = user.projets.all()
        serializer = ProjetSerializer(projets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FollowUser(APIView):
    def post(self, request):
        user_id_to_follow = request.data.get('user_id')
        if not user_id_to_follow:
            return Response({'error': 'Missing user_id in request data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_to_follow = CustomUser.objects.get(id=user_id_to_follow)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User to follow not found'}, status=status.HTTP_404_NOT_FOUND)

        if request.user.is_authenticated:
            request_user = request.user
            follow, created = Follow.objects.get_or_create(follower=request_user, followed_user=user_to_follow)
            if created:
                return Response({'success': 'User followed successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Already following this user'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

class FollowersListView(generics.ListAPIView):
    serializer_class = AuthorSerializer
    permission_classes = [permissions.IsAuthenticated]  # Assurez-vous que l'utilisateur est authentifié

    def get_queryset(self):
        # Récupérer les IDs des utilisateurs suivis par l'utilisateur authentifié
        followed_user_ids = Follow.objects.filter(follower=self.request.user).values_list('followed_user_id', flat=True)
        # Récupérer les utilisateurs correspondants à ces IDs
        followers = CustomUser.objects.filter(id__in=followed_user_ids)
        return followers

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class ReponseCreateView(APIView):
    def post(self, request):
        serializer = ReponseSerializer(data=request.data)
        if serializer.is_valid():
            reponse = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReponseReplyView(APIView):
    def post(self, request):
        parent_id = request.data.get('parent_id')
        if parent_id:
            try:
                parent_reponse = Reponse.objects.get(pk=parent_id)
            except Reponse.DoesNotExist:
                return Response({"error": "Parent reponse does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            serializer = ReponseSerializer(data=request.data)
            if serializer.is_valid():
                reponse = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Parent ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        

class UserDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        user_serializer = AuthorSerializer(user)

        questions = Question.objects.filter(auteur=user)
        question_serializer = QuestionSerializer(questions, many=True)

        publications = Publication.objects.filter(mainAuteur=user)
        publication_serializer = PublicationSerializer(publications, many=True)

        response_data = {
            "user": user_serializer.data,
            "questions": question_serializer.data,
            "publications": publication_serializer.data
        }

        return Response(response_data)
    

class ProjetCreateView(generics.CreateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(responsable=self.request.user)



class MessageCreateView(generics.CreateAPIView):
    queryset = Messages.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        # Récupérer l'ID du groupe à partir du corps de la requête
        groupe_id = self.request.data.get('groupe_id')
        
        # Récupérer l'instance du projet associé à partir de l'ID du groupe
        projet = Projet.objects.get(pk=groupe_id)
        
        # Ajouter le projet à l'instance de message
        serializer.save(sender=self.request.user, groupe=projet)



class ProjetListView(generics.ListAPIView):
    serializer_class = ProjetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Projet.objects.filter(Q(responsable=user) | Q(membres=user)).distinct()





class MessageDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message_id = request.data.get('message_id')
        if not message_id:
            return Response({"error": "message_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            message = Messages.objects.get(pk=message_id)
        except Messages.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MessageSerializer(message)
        return Response(serializer.data)

# Vue pour récupérer les détails d'un projet spécifique à partir du corps de la requête
class ProjetDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        projet_id = request.data.get('projet_id')
        if not projet_id:
            return Response({"error": "projet_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            projet = Projet.objects.get(pk=projet_id)
        except Projet.DoesNotExist:
            return Response({"error": "Projet not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjetSerializer(projet)
        return Response(serializer.data)

# Vue pour lister tous les messages d'un projet spécifique à partir du corps de la requête
class MessageListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        projet_id = request.data.get('projet_id')
        if not projet_id:
            return Response({"error": "projet_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        messages = Messages.objects.filter(groupe_id=projet_id)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    




class UserQuestionsView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Question.objects.filter(auteur=user)

class UserPublicationsView(generics.ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Publication.objects.filter(mainAuteur=user)
    

class AddReferencesView(APIView):

    def post(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        cited_publication_ids = request.data.get('cited_publication_ids', [])

        try:
            publication = Publication.objects.get(id=publication_id)
        except Publication.DoesNotExist:
            return Response({'error': 'Publication not found'}, status=status.HTTP_404_NOT_FOUND)

        for cited_id in cited_publication_ids:
            try:
                cited_publication = Publication.objects.get(id=cited_id)
                Reference.objects.create(
                    citing_publication=publication,
                    cited_publication=cited_publication
                )
                # Increment citation count for each cited publication
                cited_publication.increment_citations()
                # Increment reference count for the citing publication
                publication.increment_references()
            except Publication.DoesNotExist:
                continue
        
        return Response({'message': 'References added successfully'}, status=status.HTTP_200_OK)

class GetReferencesDetailsView(APIView):

    def post(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        if not publication_id:
            return Response({'error': 'Publication ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            publication = Publication.objects.get(id=publication_id)
        except Publication.DoesNotExist:
            return Response({'error': 'Publication not found'}, status=status.HTTP_404_NOT_FOUND)

        references = publication.references.all()

        references_details = []
        for reference in references:
            reference_serializer = PublicationRefSerializer(reference)
            references_details.append(reference_serializer.data)

        return Response(references_details, status=status.HTTP_200_OK)
    


class CreateFollowingPublicationView(generics.CreateAPIView):
    queryset = FollowingPublication.objects.all()
    serializer_class = FollowingPublicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        publication = Publication.objects.get(id=publication_id)
        FollowingPublication.objects.create(user=request.user, publication=publication)
        publication.increment_followers(request.user)
        return Response({'status': 'following'}, status=status.HTTP_201_CREATED)

class CreateRecommendedPublicationView(generics.CreateAPIView):
    queryset = RecommendedPublication.objects.all()
    serializer_class = RecommendedPublicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        publication = Publication.objects.get(id=publication_id)
        RecommendedPublication.objects.create(user=request.user, publication=publication)
        publication.increment_recommendations(request.user)
        return Response({'status': 'recommended'}, status=status.HTTP_201_CREATED)
    
class DeleteFollowingPublicationView(generics.DestroyAPIView):
    queryset = FollowingPublication.objects.all()
    serializer_class = FollowingPublicationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        publication = Publication.objects.get(id=publication_id)
        FollowingPublication.objects.filter(user=request.user, publication=publication).delete()
        publication.decrement_followers(request.user)
        return Response({'status': 'unfollowed'}, status=status.HTTP_204_NO_CONTENT)

class DeleteRecommendedPublicationView(generics.DestroyAPIView):
    queryset = RecommendedPublication.objects.all()
    serializer_class = RecommendedPublicationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        publication = Publication.objects.get(id=publication_id)
        RecommendedPublication.objects.filter(user=request.user, publication=publication).delete()
        publication.decrement_recommendations(request.user)
        return Response({'status': 'unrecommended'}, status=status.HTTP_204_NO_CONTENT)

class CreateSavedPublicationView(generics.CreateAPIView):
    queryset = SavedPublication.objects.all()
    serializer_class = SavedPublicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        try:
            publication = Publication.objects.get(id=publication_id)
        except Publication.DoesNotExist:
            return Response({'error': 'Publication not found'}, status=status.HTTP_404_NOT_FOUND)

        publication.increment_saved(request.user)
        return Response({'status': 'saved'}, status=status.HTTP_201_CREATED)

class DeleteSavedPublicationView(generics.DestroyAPIView):
    queryset = SavedPublication.objects.all()
    serializer_class = SavedPublicationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        publication_id = request.data.get('publication_id')
        try:
            publication = Publication.objects.get(id=publication_id)
        except Publication.DoesNotExist:
            return Response({'error': 'Publication not found'}, status=status.HTTP_404_NOT_FOUND)

        publication.decrement_saved(request.user)
        return Response({'status': 'unsaved'}, status=status.HTTP_204_NO_CONTENT)


class ListRecommendedPublicationsView(generics.ListAPIView):
    serializer_class = RecommendedPublicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecommendedPublication.objects.filter(user=self.request.user)

class ListFollowingPublicationsView(generics.ListAPIView):
    serializer_class = FollowingPublicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FollowingPublication.objects.filter(user=self.request.user)

class ListSavedPublicationsView(generics.ListAPIView):
    serializer_class = SavedPublicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedPublication.objects.filter(user=self.request.user)
    
class SavedPublicationListAPIView(generics.ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Publication.objects.filter(saved_by_users__user=user)


class FollowingPublicationListAPIView(generics.ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Publication.objects.filter(followingpublication__user=user)


class RecommendedPublicationListAPIView(generics.ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Publication.objects.filter(recommendedpublication__user=user)

class SameDepartmentFacultyUsersAPIView(generics.ListAPIView):
    serializer_class = AuthorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = CustomUser.objects.filter(departement=user.departement, faculte=user.faculte)
        return queryset




class FollowersAPIView(generics.ListAPIView):
    serializer_class = AuthorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        follower_ids = Follow.objects.filter(followed_user=user).values_list('follower_id', flat=True)
        queryset = CustomUser.objects.filter(id__in=follower_ids)
        return queryset
    





class UnfollowUserAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = request.user
        followed_user_id = request.data.get('person_id')
        if not followed_user_id:
            return Response({"error": "person_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            follow_instance = Follow.objects.get(follower=user, followed_user_id=followed_user_id)
            follow_instance.delete()
            return Response({"success": "User unfollowed successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Follow.DoesNotExist:
            return Response({"error": "Follow relationship does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    

class FollowUserAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        followed_user_id = request.data.get('person_id')
        if not followed_user_id:
            return Response({"error": "person_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            followed_user = CustomUser.objects.get(id=followed_user_id)
            Follow.objects.create(follower=user, followed_user=followed_user)
            return Response({"success": "User followed successfully"}, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    
class SimilarKeywordsUserView(generics.ListAPIView):
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        keywords = self.request.query_params.getlist('keywords', [])
        if len(keywords) < 2:
            return CustomUser.objects.none()

        query = Q()
        for keyword in keywords:
            query &= Q(keywords__icontains=keyword)

        return CustomUser.objects.annotate(num_keywords=Count('keywords')).filter(query).distinct()
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class PublicationSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        titre = request.data.get('titre')
        auteur = request.data.get('auteur')
        type_pub = request.data.get('type')

        queryset = Publication.objects.all()
        filtered_queryset = []

        for publication in queryset:
            if titre and fuzz.partial_ratio(titre, publication.titre) < 80:
                continue
            if auteur:
                auteur_matched = False
                for author in publication.auteurs.all():
                    if (fuzz.partial_ratio(auteur, author.first_name) >= 80 or 
                        fuzz.partial_ratio(auteur, author.last_name) >= 80):
                        auteur_matched = True
                        break
                if not auteur_matched:
                    continue
            if type_pub and fuzz.partial_ratio(type_pub, publication.type) < 80:
                continue
            filtered_queryset.append(publication)

    
        serializer = PublicationSerializer(filtered_queryset, many=True)
        return Response(serializer.data)


class PublicationSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        titre = request.data.get('titre')
        auteur = request.data.get('auteur')
        type_pub = request.data.get('type')

        queryset = Publication.objects.all()
        filtered_queryset = []

        for publication in queryset:
            if titre and fuzz.partial_ratio(titre, publication.titre) < 60:
                continue

            auteur_matched = False
            if auteur:
                # Check mainAuteur
                if publication.mainAuteur and (
                    fuzz.partial_ratio(auteur, publication.mainAuteur.first_name) >= 70 or
                    fuzz.partial_ratio(auteur, publication.mainAuteur.last_name) >= 70):
                    auteur_matched = True
                
                # Check other authors
                if not auteur_matched:
                    for author in publication.auteurs.all():
                        if (fuzz.partial_ratio(auteur, author.first_name) >= 70 or 
                            fuzz.partial_ratio(auteur, author.last_name) >= 70):
                            auteur_matched = True
                            break

                if not auteur_matched:
                    continue

            if type_pub and fuzz.partial_ratio(type_pub, publication.type) < 80:
                continue

            filtered_queryset.append(publication)

        serializer = PublicationSerializer(filtered_queryset, many=True)
        return Response(serializer.data)
    


class ReponseCreateView(APIView):
    def post(self, request):
        question_id = request.data.get('question_id')
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)

        # Reste de votre logique pour créer la réponse en utilisant question si nécessaire
        serializer = ReponseSerializer(data=request.data)
        if serializer.is_valid():
            # Exemple d'utilisation de question dans la création de la réponse
            reponse = Reponse(
                contenu=serializer.validated_data['contenu'],
                auteur=request.user,
                date=timezone.now(),
                question=question  # Utilisation de question ici
            )
            reponse.save()
            return Response(ReponseSerializer(reponse).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ReponseReplyView(APIView):
    def post(self, request):
        parent_id = request.data.get('parent_id')
        if parent_id:
            try:
                parent_reponse = Reponse.objects.get(pk=parent_id)
            except Reponse.DoesNotExist:
                return Response({"error": "Parent reponse does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            serializer = ReponseSerializer(data=request.data)
            if serializer.is_valid():
                reponse = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Parent ID is required."}, status=status.HTTP_400_BAD_REQUEST)







