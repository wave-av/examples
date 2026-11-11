#!/usr/bin/env bash
# Verification for content-policy.sh: ripgrep ignore files must not hide BLOCK hits.
# Fixtures live in mktemp only — this file must not commit leak-shaped strings into
# the published tree.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SCRIPT="$ROOT/scripts/public-repo-guard/content-policy.sh"
# Synthetic Cloudflare account_id shape (32 hex). Not a live identifier.
ACCOUNT_LINE='account_id = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"'

fail=0
assert_exit() {
  local want="$1" name="$2"
  shift 2
  local code=0
  local out
  out="$("$@" 2>&1)" || code=$?
  if [[ "$code" -ne "$want" ]]; then
    echo "FAIL: $name — expected exit $want, got $code"
    printf '%s\n' "$out"
    fail=1
  else
    echo "PASS: $name"
  fi
}

td="$(mktemp -d)"
trap 'rm -rf "$td" "$td2" "$td3" "$td4"' EXIT

printf '%s\n' "$ACCOUNT_LINE" >"$td/leak.toml"
printf '*\n' >"$td/.rgignore"
assert_exit 1 ".rgignore must not hide BLOCK hits — content-policy exited 0" \
  bash "$SCRIPT" "$td"

td2="$(mktemp -d)"
printf '%s\n' "$ACCOUNT_LINE" >"$td2/leak.toml"
printf '*\n' >"$td2/.ignore"
assert_exit 1 ".ignore must not hide BLOCK hits — content-policy exited 0" \
  bash "$SCRIPT" "$td2"

td3="$(mktemp -d)"
printf '%s\n' "$ACCOUNT_LINE" >"$td3/skipped.toml"
printf 'skipped.toml\n' >"$td3/.guardignore"
assert_exit 0 ".guardignore still excludes a named path" \
  bash "$SCRIPT" "$td3"

td4="$(mktemp -d)"
printf '%s\n' "$ACCOUNT_LINE" >"$td4/leak.toml"
assert_exit 1 "BLOCK hit without ignore files still fails the gate" \
  bash "$SCRIPT" "$td4"

if (( fail > 0 )); then
  exit 1
fi
echo "content-policy.test.sh: all assertions passed"
