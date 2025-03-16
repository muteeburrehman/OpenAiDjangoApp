from rest_framework import serializers
# internals
from api.models import CodeExplainer

class CodeExplainSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeExplainer
        fields = {"id","_input","_output"}