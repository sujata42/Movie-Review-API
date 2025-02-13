from ninja import NinjaAPI, ModelSchema
from .models import Movie, Review
from django.shortcuts import get_object_or_404

api = NinjaAPI()

# Schemas
class MovieSchema(ModelSchema):
    class Config:
        model = Movie
        model_fields = ['id', 'title', 'description', 'release_year']

class ReviewSchema(ModelSchema):
    class Config:
        model = Review
        model_fields = ['id', 'movie', 'reviewer', 'rating', 'comment', 'created_at']

# Movie Endpoints
@api.get("/movies/", response=list[MovieSchema])
def list_movies(request):
    return Movie.objects.all()

@api.post("/movies/", response=MovieSchema)
def create_movie(request, data: MovieSchema):
    movie = Movie.objects.create(**data.dict())
    return movie

@api.get("/movies/{movie_id}/", response=MovieSchema)
def get_movie(request, movie_id: int):
    movie = get_object_or_404(Movie, id=movie_id)
    return movie

@api.put("/movies/{movie_id}")
def update_movie(request, movie_id: int, movie: MovieSchema):
    movie_obj = get_object_or_404(Movie, id=movie_id)
    for attr, value in movie.dict().items():
        setattr(movie_obj, attr, value)
    movie_obj.save()
    return {"success": True}

@api.delete("/movies/{movie_id}/")
def delete_movie(request, movie_id: int):
    movie = get_object_or_404(Movie, id=movie_id)
    movie.delete()
    return {"success": True}

# Review Endpoints
@api.get("/reviews/", response=list[ReviewSchema])
def list_reviews(request):
    return Review.objects.all()

@api.post("/reviews/", response=ReviewSchema)
def create_review(request, data: ReviewSchema):
    # Retrieve the Movie instance using the movie ID
    movie = get_object_or_404(Movie, id=data.movie)  # Ensure you fetch the actual Movie instance
    
    # Create the review using the retrieved Movie instance
    review = Review.objects.create(
        movie=movie,
        reviewer=data.reviewer,
        rating=data.rating,
        comment=data.comment,
        created_at=data.created_at  # If created_at is auto-generated, you can omit this
    )
    return review

@api.put("/reviews/{review_id}")
def update_review(request, movie_id: int, review_id: int, review: ReviewSchema):
    review_obj = get_object_or_404(Review, id=review_id, movie_id=movie_id)
    for attr, value in review.dict().items():
        setattr(review_obj, attr, value)
    review_obj.save()
    return {"success": True}

@api.delete("/reviews/{review_id}")
def delete_review(request, movie_id: int, review_id: int):
    review_obj = get_object_or_404(Review, id=review_id, movie_id=movie_id)
    review_obj.delete()
    return {"success": True}


