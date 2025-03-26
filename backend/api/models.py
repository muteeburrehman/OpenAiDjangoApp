from django.db import models
from django.contrib.auth.models import User

class CodeExplainer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='code_explanations', null=True)
    _input = models.TextField()  # Corrected from *input
    _output = models.TextField()  # Corrected from *output
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "t_code_explainer"
        ordering = ['-created_at']

    def __str__(self):  # Corrected from **str**
        return f"Code Explanation by {self.user.username if self.user else 'Anonymous'}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    api_usage_count = models.IntegerField(default=0)

    def __str__(self):  # Corrected from **str**
        return f"Profile for {self.user.username}"