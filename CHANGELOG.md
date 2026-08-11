# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
<<<<<<< HEAD

### Fixed

- `pr-agent` lane: fork-triggered `/` commands are now refused, and the AI
  call's budget fits inside its step. Three defects, one of them only visible
  once the first was fixed.

  The job-level `if:` refused forks on the `pull_request` arm and could not on
  `issue_comment` — fork status is absent from that payload, so there was never
  an expression to write. A `fork gate` step now asks the pulls endpoint and
  fails closed: only a literal `false` proceeds, so a 404, a rate limit or a
  deleted fork all skip. The lane runs no `actions/checkout`, so fork code was
  never executed and no exfiltration path existed; what this closes is the
  comment claiming forks were already skipped, which was true of one arm only.

  `CONFIG__AI_TIMEOUT` was 600s inside a 360s step, so the runner killed the
  step before pr-agent could reach its own timeout or fall back to a secondary
  model. Now 300s.

  Fixing the first exposed a third: `stamp attempt 2 end` runs under
  `if: always()`, so when attempt 2 never ran the verdict subtracted from zero
  and reported a 1787580408-second attempt as a confident TIMED OUT.

  Contributors on forks are affected: a maintainer's `/review` on a fork PR is
  now declined with a warning rather than silently running.
  (wave-av/wave-foundation-public#73)
||||||| parent of 4ae7471 (docs(changelog): add agent-clip-demo entry)
=======

### Added

- **agent-clip-demo** — end-to-end agent-video demo: voice synthesis → clip
  creation → signed video delivery, verified against the live production API.

  Three commands (`demo.mjs synthesize | clip | all`) reproduce the keystone
  pipeline: `POST /v1/voice {text}` returns real `audio/mpeg` MP3 narration;
  `POST /v1/clips {source, in, out}` returns a `201` clipId + HMAC-signed
  delivery URL; the delivery URL serves `200 video/mp4` from
  `media.wave.online`. Includes a WAVE-branded showcase page (`index.html`)
  and a pre-rendered sample video (WAVE narration over a Big Buck Bunny
  source clip).

  Verification receipts: source recording `f7acfa81-…` (BBB, .mp4, ready)
  → clip create `201` → clip engine produced 46KB 5s 1280×720 H.264/AAC
  → signed URL `200 video/mp4`. All against `api.wave.online` and
  `media.wave.online`.
>>>>>>> 4ae7471 (docs(changelog): add agent-clip-demo entry)
