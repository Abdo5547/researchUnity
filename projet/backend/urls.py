from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import AddReferencesView, FollowersAPIView,ReponseCreateView, CreateFollowingPublicationView, CreateFollowingQuestionView, CreatePublicationView, CreateRecommendedPublicationView, CreateRecommendedQuestionView, CreateSavedPublicationView, DeleteFollowingPublicationView, DeleteFollowingQuestionView, DeleteRecommendedPublicationView, DeleteRecommendedQuestionView, DeleteSavedPublicationView, DownloadDocumentAPIView, FollowUserAPIView, FollowingPublicationListAPIView, GetReferencesDetailsView, ListFollowingPublicationsView, ListFollowingQuestionsView,  ListRecommendedPublicationsView, ListRecommendedQuestionsView, ListSavedPublicationsView, MessageCreateView, MessageDetailView, MessageListView, ProjetDetailView, ProjetListView, PublicationDetailView, PublicationSearchView, RecommendedPublicationListAPIView, SameDepartmentFacultyUsersAPIView, SavedPublicationListAPIView, SimilarKeywordsUserView, UnfollowUserAPIView, UserDetail, UserDetailView,QuestionListView, LogoutView, UserListView,SignupView,SigninView,PublicationListView,QuestionCreateView, UserProfileView,ProjetCreateView, UserProjectsView, UserPublicationsView, UserQuestionsView
urlpatterns = [
    path('signup2/', SignupView.as_view(), name='register'),
    path('signin/', SigninView.as_view(), name='login'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('logout/', LogoutView.as_view(), name='user-lougout'),
    path('users/', UserListView.as_view(), name='users'),
    path('creatpub/', CreatePublicationView.as_view(), name='creat-pub'),
    path('listpub/', PublicationListView.as_view(), name='creat-pub'),
    path('creatquest/', QuestionCreateView.as_view(), name='question-create'),
    path('listquest/', QuestionListView.as_view(), name='question-create'),
    path('addproject/', ProjetCreateView.as_view(), name='creer_projet'),
    path('user-profile/', UserProfileView.as_view(), name='user_profile'),
    path('follow/', CreateFollowingQuestionView.as_view(), name='follow_question'),
    path('unfollow/', DeleteFollowingQuestionView.as_view(), name='unfollow_question'),
    path('recommend/', CreateRecommendedQuestionView.as_view(), name='recommend_question'),
    path('unrecommend/', DeleteRecommendedQuestionView.as_view(), name='unrecommend_question'),
    path('following/', ListFollowingQuestionsView.as_view(), name='list_following_questions'),
    path('recommended/', ListRecommendedQuestionsView.as_view(), name='list_recommended_questions'),
    path('publications/<int:pk>/download/', DownloadDocumentAPIView.as_view(), name='publication-download'),
    path('publications/<int:pk>/', PublicationDetailView.as_view(), name='publication-detail'), 
    path('profileuser/', UserDetail.as_view(), name='user-detail'),
  # Ajout de l'url de téléchargement
    path('projects/', ProjetListView.as_view(), name='list-projets'), #list projet
    path('projectdetail/', ProjetDetailView.as_view(), name='detail-projet'), 
    path('messages/', MessageListView.as_view(), name='list-messages'),  
    path('messagedetail/', MessageDetailView.as_view(), name='detail-message'),
    path('addmessage/', MessageCreateView.as_view(), name='create-message'),
    path('userlistquest/', UserQuestionsView.as_view(), name='list_question'),
    path('userlistpub/', UserPublicationsView.as_view(), name='list_publication'),
    path('setref/', AddReferencesView.as_view(), name='add_references'),
    path('viewref/', GetReferencesDetailsView.as_view(), name='get_publication_details'),


    path('savepub/', CreateSavedPublicationView.as_view(), name='save_publication'),
    path('unsavepub/', DeleteSavedPublicationView.as_view(), name='save_publication'),

    path('followpub/', CreateFollowingPublicationView.as_view(), name='follow_publication'),
    path('unfollowpub/', DeleteFollowingPublicationView.as_view(), name='unfollow_publication'),

    path('recommandepub/', CreateRecommendedPublicationView.as_view(), name='recommande_publication'),
    path('unrecommandepub/', DeleteRecommendedPublicationView.as_view(), name='unrecommande_publication'),


    path('userlistsave/', SavedPublicationListAPIView.as_view(), name='saved-publications-list'),
    path('userlistfollowed/', FollowingPublicationListAPIView.as_view(), name='followed-publications-list'),
    path('userlistrecommended/', RecommendedPublicationListAPIView.as_view(), name='recommended-publications-list'),

    path('nearusers/', SameDepartmentFacultyUsersAPIView.as_view(), name='same-department-faculty-users'),
    path('ifollow/', FollowUserAPIView.as_view(), name='follow-user'),
    path('memekey/', SimilarKeywordsUserView.as_view(), name='similar-keywords-users'),

    path('search-publications/', PublicationSearchView.as_view(), name='search-publications'),
    
    path('followuser/', FollowUserAPIView.as_view(), name='follow-user'),
    path('unfollowuser/', UnfollowUserAPIView.as_view(), name='unfollow-user'),
    path('followers/', FollowersAPIView.as_view(), name='followers'),


    path('addreponse/', ReponseCreateView.as_view(), name='reponse'),








]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
