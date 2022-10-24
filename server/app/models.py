from typing import List, Any, Mapping, Dict


class Field:
    # default_value = None => filed is required
    def __init__(self, name: str, value_type: Any, foreign_key=None, default_value: Any = None):
        self.name: str = name
        self.value_type: Any = value_type
        self.default_value: value_type = default_value

        # pair of (<referenced entity>, <referenced filed name>)
        # default value of <referenced filed name> is self.name
        self.foreign_key: (EntityModel, str)
        if isinstance(foreign_key, EntityModel):
            self.foreign_key = (foreign_key, self.name)
        else:
            self.foreign_key = foreign_key


class EntityModel:
    def __init__(self, fields: List[Field]):
        self.fields: List[Field] = fields

    def instance(self, **kwargs) -> Dict[str, Any]:
        result: Dict[str, Any] = dict()

        for field in self.fields:
            value: field.value_type = field.value_type(kwargs[field.name]) \
                if field.name in kwargs \
                else field.default_value

            if value is None:
                raise ValueError("Field `%s` is required" % (field.name,))
            result[field.name] = value

        return result

    def add(self, instance: Dict[str, Any]):
        raise NotImplementedError("TODO")


class UsersModel(EntityModel):
    def __init__(self):
        super().__init__(fields=[
            Field("user_id", int),
            Field("password_hash", str),
            Field("password_salt", str),
            Field("first_name", str),
            Field("last_name", str),
            Field("year_of_study", int),
            Field("email", str),
        ])


Users = UsersModel()


class GroupsModel(EntityModel):
    def __init__(self):
        super().__init__(fields=[
            Field("group_id", int),
            Field("name", str),
            Field("description", str)
        ])


Groups = GroupsModel()
