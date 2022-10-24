import json
from collections import Counter
from typing import List, Dict

from flask import request
import server.app.functions as functions
from server.app import app

from server.app.forms import Form
from server.app.models import EntityModel, Users, Groups


@app.route("/")
@app.route("/index")
def index():
    return "Hello, World!"


@app.route("/api/v1/service/status", methods=["GET"])
def status():
    return functions.status()


def process_add_entity_form_function(model_type: EntityModel, *args, **kwargs):
    @app.route(*args, **kwargs, methods=["POST"])
    def process_form_data():
        form: Form = Form(model_type)
        form_data: Dict = request.form
        obj: Dict = form.parse(form_data)
        model_type.add(obj)


process_add_entity_form_function(Users, "/users/add")
process_add_entity_form_function(Groups, "/groups/add")
