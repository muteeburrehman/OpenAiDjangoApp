from rest_framework import views, status
from rest_framework.response import Response
# internals
from api.serializers import CodeExplainSerializer

class CodeExplainView(views.APIView):
    serializer_class = CodeExplainSerializer

    def get(self, request, format=None):
        pass

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)