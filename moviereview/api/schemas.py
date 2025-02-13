from ninja import ModelSchema
from api.models import Movie, Review

class ReviewSchema(ModelSchema):
    class Config:
        model = Review
        model_fields = ["id", "movie", "text", "rating"]  # ✅ Ensure correct fields

class MovieSchema(ModelSchema):
    reviews: list[ReviewSchema] = []  # ✅ Include reviews inside MovieSchema

    class Config:
        model = Movie
        model_fields = ["id", "title", "description", "release_year"]
