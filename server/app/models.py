from typing import List, Any, Dict

from app.extensions import dbm
from exceptions.insert_exceptions import ConstraintInsertException


class Field:
    def __init__(self,
                 name: str,
                 value_type: Any,
                 foreign_key=None,
                 required=True,
                 db_auto=False,  # if true - entirely managed by db (e.g. PRIMARY KEY AUTOINCREMENT)
                 default_value: Any = None):
        self.name: str = name
        self.value_type: Any = value_type
        self.required: bool = required
        self.db_auto: bool = db_auto
        self.default_value: value_type = default_value

        # if managed by db - cannot ask user to enter the value & cannot fill the value ourselves
        assert (not self.db_auto or (not self.required and self.default_value is None))

        # pair of (<referenced entity>, <referenced field name>)
        # default value of <referenced filed name> is self.name
        self.foreign_key: (EntityModel, str)
        if isinstance(foreign_key, EntityModel):
            self.foreign_key = (foreign_key, self.name)
        else:
            self.foreign_key = foreign_key


class EntityModel:
    def __init__(self, table_name: str, fields: List[Field]):
        self.table_name: str = table_name
        self.fields: List[Field] = fields

    # check the constraints
    def __instance_guard(self, instance: Dict[str, Any]):
        for field in self.fields:
            value: field.value_type = field.value_type(instance[field.name]) \
                if field.name in instance and instance[field.name] is not None \
                else field.default_value

            if field.required and value is None:
                raise ConstraintInsertException("Field `%s` is required" % (field.name,))

            if field.db_auto and value is not None:
                raise ConstraintInsertException("Field `%s` is entirely managed by the DB" % (field.name,))

    def instance(self, **kwargs) -> Dict[str, Any]:
        result: Dict[str, Any] = dict()

        for field in self.fields:
            value: field.value_type = field.value_type(kwargs[field.name]) \
                if field.name in kwargs \
                else field.default_value
            result[field.name] = value

        self.__instance_guard(result)

        return result

    def add(self, instance: Dict[str, Any]) -> int:
        self.__instance_guard(instance)

        return dbm.insert_into(
            table_name=self.table_name,
            column_value_pairs=instance
        )

    def all(self):
        field_names: List[str] = list(map(lambda x: x.name, self.fields))

        query_res: List = dbm.select_all(
            self.table_name,
            fields=field_names
        )

        instances: List[Dict[str, Any]] = []
        for row in query_res:
            instance = dict(zip(field_names, row))
            # self.__instance_guard(instance) # disabled as we assert that all instances are correct in the db
            instances.append(instance)

        return instances


class UsersModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Users",
                         fields=[
                             Field("user_id", int, required=False, db_auto=True),
                             Field("password_hash", str),
                             Field("password_salt", str),
                             Field("first_name", str),
                             Field("last_name", str),
                             Field("graduation_year", int, required=False),
                             Field("email", str, required=False),
                         ])


class GroupsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Groups",
                         fields=[
                             Field("group_id", int, required=False, db_auto=True),
                             Field("name", str),
                             Field("description", str)
                         ])
