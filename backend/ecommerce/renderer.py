from rest_framework import renderers
import json


class ResponseRenderer(renderers.JSONRenderer):
    charset = 'utf-8'
    def render(self, data, accepted_media_type=None, renderer_context=None):
        
        Response = ''
        if 'Error' in str(data):
            Response = {"error": data}
        else:
            Response = {'data': data}
        JsonResponse = json.dumps(Response)
        return JsonResponse