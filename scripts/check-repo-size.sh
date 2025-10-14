#!/bin/bash

set -e
echo "🔍 Checking repository size for deployment..."

SIZE_LIMIT_MB=1750

EXCLUDED_DIRS=(
  ".git"
  ".next/cache"
)

EXCLUDE_ARGS=""
for dir in "${EXCLUDED_DIRS[@]}"; do
  EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude=$dir"
done

echo "📏 Calculating repository size..."
SIZE_BYTES=$(du -sb . $EXCLUDE_ARGS | cut -f1)
SIZE_MB=$((SIZE_BYTES / 1024 / 1024))

echo "📊 Repository size (production): ${SIZE_MB} MB"
echo "🎯 Size limit: ${SIZE_LIMIT_MB} MB"

if [ $SIZE_MB -gt $SIZE_LIMIT_MB ]; then
  echo ""
  echo "❌ Repository size (${SIZE_MB} MB) exceeds limit (${SIZE_LIMIT_MB} MB)"
  echo ""
  echo "🔍 Largest directories:"
  du -h --max-depth=2 . $EXCLUDE_ARGS | sort -hr | head -20
  exit 1
else
  echo "✅ Repository size (${SIZE_MB} MB) is within limit (${SIZE_LIMIT_MB} MB)"
fi
