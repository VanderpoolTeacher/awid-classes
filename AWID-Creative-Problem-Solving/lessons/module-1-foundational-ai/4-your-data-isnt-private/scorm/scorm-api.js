/*
 * Minimal SCORM 1.2 run-time wrapper.
 *
 * What it is:   a small JavaScript bridge to a SCORM 1.2 Learning Management System (LMS).
 * What it does: finds the LMS API, opens a session, reports completion + score, and closes.
 * How it fits:  it's the layer that lets this self-contained HTML lesson "talk" to any
 *               SCORM 1.2 LMS (Moodle, Canvas, SCORM Cloud, etc.). If no LMS is present
 *               (e.g. you just opened index.html in a browser), every call no-ops safely so
 *               the lesson still works standalone.
 *
 * SCORM 1.2 reference values used here:
 *   cmi.core.lesson_status  -> "incomplete" | "completed" | "passed" | "failed"
 *   cmi.core.score.raw      -> 0..100
 *   cmi.core.score.min/max  -> bounds
 */
(function (global) {
  "use strict";

  var api = null;          // the discovered LMS API object
  var initialized = false;

  // --- Find the SCORM 1.2 API object by walking up the window chain ---------
  function findAPI(win) {
    var tries = 0;
    while (win && win.API == null && win.parent != null && win.parent !== win) {
      tries++;
      if (tries > ns_safety_limit()) return null;
      win = win.parent;
    }
    return win ? win.API : null;
  }
  function ns_safety_limit() { return 500; }

  function getAPI() {
    var theAPI = null;
    if (typeof window !== "undefined") {
      theAPI = findAPI(window);
      if (theAPI == null && window.opener) theAPI = findAPI(window.opener);
    }
    return theAPI;
  }

  // --- Public, defensive wrapper -------------------------------------------
  var SCORM = {
    available: function () { return api != null; },

    init: function () {
      api = getAPI();
      if (api == null) {
        console.info("[SCORM] No LMS API found — running standalone (calls will no-op).");
        return false;
      }
      var ok = api.LMSInitialize("") === "true";
      initialized = ok;
      if (ok) {
        // Mark as started if the LMS hasn't recorded a status yet.
        var status = api.LMSGetValue("cmi.core.lesson_status");
        if (!status || status === "not attempted") {
          api.LMSSetValue("cmi.core.lesson_status", "incomplete");
        }
        api.LMSSetValue("cmi.core.score.min", "0");
        api.LMSSetValue("cmi.core.score.max", "100");
        api.LMSCommit("");
      }
      return ok;
    },

    setScore: function (raw) {
      if (!initialized) return;
      api.LMSSetValue("cmi.core.score.raw", String(Math.round(raw)));
      api.LMSCommit("");
    },

    // pass a boolean: true -> "passed", false -> "completed" (still finished, not failed)
    complete: function (passed) {
      if (!initialized) return;
      api.LMSSetValue("cmi.core.lesson_status", passed ? "passed" : "completed");
      api.LMSCommit("");
    },

    finish: function () {
      if (!initialized) return;
      api.LMSFinish("");
      initialized = false;
    }
  };

  // Best-effort: close the session when the learner leaves.
  if (typeof window !== "undefined") {
    window.addEventListener("unload", function () { SCORM.finish(); });
  }

  global.SCORM = SCORM;
})(typeof window !== "undefined" ? window : this);
