

from ninja import Router
from api.models import Movie
from api.schemas import MovieSchema
from django.shortcuts import get_object_or_404

router = Router()

@router.get("/movies", response=list[MovieSchema])
def list_movies(request):
    return Movie.objects.prefetch_related("reviews").all()  # ✅ Fetch movies with reviews
