#!/bin/bash

# --- 1. SETTINGS & COLORS ---
ENV_FILE=".env"
DEV_COMMAND="npm run start:dev"
FORMAT_COMMAND="npm run format"

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}--------------${NC}"
echo -e "🚀 Dev Pipeline"
echo -e "${GREEN}--------------${NC}"

# --- 2. FAST VALIDATION & LOADING ---
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ ERROR: $ENV_FILE not found!${NC}"
    exit 1
fi

echo "📂 Hydrating environment..."
set -a
source "$ENV_FILE"
set +a

# --- 3. PRE-FLIGHT CHECK ---
REQUIRED_VARS=("MONGO_URI" "JWT_SECRET")
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}⚠️  CRITICAL: $var is missing in $ENV_FILE${NC}"
        exit 1
    fi
done

# --- 4. EXECUTION PHASE ---
echo -e "🏃 ${GREEN}Formatting code...${NC}"
$FORMAT_COMMAND

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Format failed, but starting dev anyway...${NC}"
fi

echo -e "📡 ${GREEN}Launching Application...${NC}"
echo "------------------------------------------"

exec $DEV_COMMAND
