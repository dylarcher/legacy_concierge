#!/bin/bash
# Pre-commit validation for Tailwind CSS classes

echo "🔍 Running pre-commit checks..."

# Run Biome
echo "→ Biome linting..."
bun run lint
if [ $? -ne 0 ]; then
	echo "❌ Biome check failed"
	exit 1
fi

# Run CSS linting
echo "→ CSS validation..."
bun run lint:css
if [ $? -ne 0 ]; then
	echo "❌ CSS linting failed"
	exit 1
fi

# Run Tailwind validation
echo "→ Tailwind class validation..."
bun run validate:tailwind
if [ $? -ne 0 ]; then
	echo "❌ Tailwind validation failed"
	exit 1
fi

echo "✅ All checks passed!"
exit 0
