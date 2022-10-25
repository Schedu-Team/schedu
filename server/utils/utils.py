from typing import Tuple, Dict
import random

import datetime
from datetime import datetime as DatetimeT
import uuid
import json
import traceback
import sys

from config import Config


def full_stack():
    exc = sys.exc_info()[0]
    stack = traceback.extract_stack()[:-1]  # last one would be full_stack()
    if exc is not None:  # i.e. an exception is present
        del stack[-1]  # remove call of full_stack, the printed exception
        # will contain the caught exception caller instead
    trc = "Traceback (most recent call last):\n"
    stack_str = trc + "".join(traceback.format_list(stack))
    if exc is not None:
        stack_str += "  " + traceback.format_exc().lstrip(trc)
    return stack_str


def gen_token() -> Tuple[str, DatetimeT]:
    return uuid.uuid4().hex, datetime.datetime.utcnow() + datetime.timedelta(
        seconds=Config.TOKEN_LIFETIME_SEC
    )


def gen_rand_key() -> int:
    return random.randint(-Config.RANDOM_BORDER, Config.RANDOM_BORDER)


def dict_to_json_str(data: Dict) -> str:
    return json.dumps(data)
