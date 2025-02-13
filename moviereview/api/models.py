# from django.db import models

# # Create your models here.


# class Movie(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     release_year = models.IntegerField()

#     def __str__(self):
#         return self.title

# class Review(models.Model):
#     movie = models.ForeignKey(Movie, related_name='reviews', on_delete=models.CASCADE)
#     reviewer = models.CharField(max_length=100)
#     rating = models.IntegerField()
#     comment = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.reviewer} - {self.movie.title}'


from django.db import models

# class Movie(models.Model):
#     title = models.CharField(max_length=255)
#     director = models.CharField(max_length=255)
#     release_year = models.IntegerField()
class Movie(models.Model):
    title = models.CharField(max_length=255)
    release_year = models.IntegerField()
    description = models.TextField() 

    def __str__(self):
        return self.title

from django.db import models

class Review(models.Model):
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.CharField(max_length=255)
    comment = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)  # Add this if missing


    def __str__(self):
        return f"{self.reviewer} - {self.movie.title}"
