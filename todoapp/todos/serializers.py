# to translate between json and python data type
from rest_framework import serializers
from .models import Todo

class TodoSerializers(serializers.ModlesSerializer):
    class Meta:
        modle = Todo
        fields = '__all__'