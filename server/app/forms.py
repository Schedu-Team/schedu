from typing import Dict, Any

from server.app.models import EntityModel


class Form:
    def __init__(self, model_type: EntityModel):
        self.model_type: EntityModel = model_type

    def parse(self, form_data: Dict[str, Any]) -> Dict[str, Any]:
        return self.model_type.instance(**form_data)
