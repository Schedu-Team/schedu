from typing import Dict

from flask import request
import app.functions as functions
from app import app

from app.forms import Form
from app.models_base import EntityModel
from app.storage import Storage
from utils.utils import remove_none_from_dict


@app.route("/")
@app.route("/index")
def index():
    return "Hello, World!"


@app.route("/api/v1/service/status", methods=["GET"])
def status():
    return functions.status()


def extract_form_data():
    if request.content_type == "application/x-www-form-urlencoded":
        return request.form
    else:
        return request.get_json()


# FORM HANDLERS

def add_entity_form_handler_function(model_type: EntityModel, *args, **kwargs):
    @app.route(*args, **kwargs, methods=["POST"], endpoint="process_add_%s_form_function" % (model_type.table_name,))
    @functions.function_response
    def process_form_data():
        form: Form = Form(model_type)
        form_data: Dict = extract_form_data()
        obj: Dict = form.parse(form_data)
        added_id = model_type.add(obj)
        return 200, {
            'inserted_id': added_id,
            'inserted_data': remove_none_from_dict(obj)
        }

    return process_form_data


add_entity_form_handler_function(Storage.Users, "/api/v1/users/add")
add_entity_form_handler_function(Storage.Groups, "/api/v1/groups/add")
add_entity_form_handler_function(Storage.Assignments, "/api/v1/assignments/add")
add_entity_form_handler_function(Storage.Roles, "/api/v1/roles/add")
add_entity_form_handler_function(Storage.Permissions, "/api/v1/permissions/add")
add_entity_form_handler_function(Storage.Attachments, "/api/v1/attachments/add")
add_entity_form_handler_function(Storage.PublicGroups, "/api/v1/public_groups/add")
add_entity_form_handler_function(Storage.TemporaryRoles, "/api/v1/temporary_roles/add")
add_entity_form_handler_function(Storage.RecurringAssignments, "/api/v1/recurring_assignments/add")
add_entity_form_handler_function(Storage.DelayedAssignments, "/api/v1/delayed_assignments/add")
add_entity_form_handler_function(Storage.User_MEMBER_OF_Group, "/api/v1/user_member_of_group/add")
add_entity_form_handler_function(Storage.Assignment_CREATED_BY_User, "/api/v1/assignment_created_by_user/add")
add_entity_form_handler_function(Storage.User_HAS_COMPLETED_Assignment, "/api/v1/user_has_completed_assignment/add")
add_entity_form_handler_function(Storage.Assignment_HAS_Attachment, "/api/v1/assignment_has_attachment/add")
add_entity_form_handler_function(Storage.Assignment_RELATES_TO_Group, "/api/v1/assignment_relates_to_group/add")
add_entity_form_handler_function(Storage.Role_INCLUDES_Permission, "/api/v1/role_includes_permission/add")
add_entity_form_handler_function(Storage.Role_RELATES_TO_Group, "/api/v1/role_relates_to_group/add")
add_entity_form_handler_function(Storage.User_HAS_Role, "/api/v1/user_has_role/add")


# GET ALL

def get_all_entities_function(model_type: EntityModel, *args, **kwargs):
    @app.route(*args, **kwargs, methods=["GET"], endpoint="get_all_%s" % (model_type.table_name,))
    @functions.function_response
    def process_form_data():
        result = model_type.all()
        return 200, {
            'response': result
        }

    return process_form_data


get_all_entities_function(Storage.Users, "/api/v1/users/all")
get_all_entities_function(Storage.Groups, "/api/v1/groups/all")
get_all_entities_function(Storage.Assignments, "/api/v1/assignments/all")
get_all_entities_function(Storage.Roles, "/api/v1/roles/all")
get_all_entities_function(Storage.Permissions, "/api/v1/permissions/all")
get_all_entities_function(Storage.Attachments, "/api/v1/attachments/all")
get_all_entities_function(Storage.PublicGroups, "/api/v1/public_groups/all")
get_all_entities_function(Storage.TemporaryRoles, "/api/v1/temporary_roles/all")
get_all_entities_function(Storage.RecurringAssignments, "/api/v1/recurring_assignments/all")
get_all_entities_function(Storage.DelayedAssignments, "/api/v1/delayed_assignments/all")
get_all_entities_function(Storage.User_MEMBER_OF_Group, "/api/v1/user_member_of_group/all")
get_all_entities_function(Storage.Assignment_CREATED_BY_User, "/api/v1/assignment_created_by_user/all")
get_all_entities_function(Storage.User_HAS_COMPLETED_Assignment, "/api/v1/user_has_completed_assignment/all")
get_all_entities_function(Storage.Assignment_HAS_Attachment, "/api/v1/assignment_has_attachment/all")
get_all_entities_function(Storage.Assignment_RELATES_TO_Group, "/api/v1/assignment_relates_to_group/all")
get_all_entities_function(Storage.Role_INCLUDES_Permission, "/api/v1/role_includes_permission/all")
get_all_entities_function(Storage.Role_RELATES_TO_Group, "/api/v1/role_relates_to_group/all")
get_all_entities_function(Storage.User_HAS_Role, "/api/v1/user_has_role/all")
