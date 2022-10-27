import json
from collections import Counter
from typing import List, Dict

from flask import request
import app.functions as functions
from app import app

from app.forms import Form
from app.models import EntityModel
from app.storage import Storage
from utils.utils import remove_none_from_dict


@app.route("/")
@app.route("/index")
def index():
    return "Hello, World!"


@app.route("/api/v1/service/status", methods=["GET"])
def status():
    return functions.status()


@app.route("/api/v1/service/test", methods=["GET"])
def test():
    return functions.test()


@app.route("/api/v1/service/test2/<user_id>", methods=["GET"])
def test2(user_id: int):
    return functions.test_2(user_id)


@app.route("/api/v1/service/test3", methods=["POST"])
def test3():
    first_name: str = request.get_json()["first_name"]
    last_name: str = request.get_json()["last_name"]
    graduation_year: int = int(request.get_json()["graduation_year"])
    return functions.test_3(first_name, last_name, graduation_year)


def add_entity_form_handler_function(model_type: EntityModel, *args, **kwargs):
    @app.route(*args, **kwargs, methods=["POST"], endpoint="process_add_%s_form_function" % (model_type.table_name,))
    @functions.function_response
    def process_form_data():
        form: Form = Form(model_type)
        form_data: Dict = request.form
        obj: Dict = form.parse(form_data)
        added_id = model_type.add(obj)
        return 200, {
            'inserted_id': added_id,
            'inserted_data': remove_none_from_dict(obj)
        }

    return process_form_data


add_entity_form_handler_function(Storage.Users, "/api/v1/users/add")
add_entity_form_handler_function(Storage.Groups, "/api/v1/groups/add")
