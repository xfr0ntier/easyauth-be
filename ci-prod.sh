#!/bin/bash

# --- 1. SETTINGS ---
echo "----------------------------------------------------"
echo "🛠️ Production Pipeline: Format -> Test -> Build"
echo "----------------------------------------------------"

# --- 2. FORMATTING CHECK ---
echo "🧹 Step 1: Checking code formatting (Prettier)..."
npm run format
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Formatting failed. Please run 'npm run format' locally."
    exit 1
fi
echo "✅ Formatting passed."

# --- 3. RUNNING TESTS ---
echo "🧪 Step 2: Running Unit Tests..."
# We use --passWithNoTests to avoid crashing if you haven't written tests yet
npm run test -- --passWithNoTests
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Tests failed. Build aborted."
    exit 1
fi
echo "✅ Tests passed."

# --- 4. BUILDING ---
echo "🏗️  Step 3: Building the NestJS application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Build failed. Check TypeScript errors."
    exit 1
fi
echo "✅ Build successful!"

# --- 5. SUMMARY ---
echo "------------------------------------------"
echo "🎉 Pipeline Complete: Ready for deployment!"
echo "------------------------------------------"