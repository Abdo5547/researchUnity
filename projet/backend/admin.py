from django.contrib import admin
from .models import CustomUser, Professor, Doctorate, Publication, Citation, Auteur, Commentaire, Question, Reponse

admin.site.register(CustomUser)
admin.site.register(Professor)
admin.site.register(Doctorate)
admin.site.register(Publication)
admin.site.register(Citation)
admin.site.register(Auteur)
admin.site.register(Commentaire)
admin.site.register(Question)
admin.site.register(Reponse)
