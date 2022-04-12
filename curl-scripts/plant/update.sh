#!/bin/bash

API="http://localhost:4741"
URL_PATH="/plants"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "species": "'"${SPECIES}"'",
      "lightLevel":  "'"${LIGHT}"'",
      "lastWaterDate": "'"${DATE}"'"
    }
  }'

echo