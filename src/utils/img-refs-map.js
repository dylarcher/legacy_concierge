/**
 * Image asset imports for Vite processing.
 * All images imported here will be bundled with content hashes.
 * @module assets
 */

// Hero/Banner Images
import birdsEyeViewCoastalTown from "../assets/media/images/birds-eye-view-of-coastal-town.png";
import blueGreenWavesBrownBeach from "../assets/media/images/blue-green-waves-brown-beach.png";
import eliteFemaleNurse from "../assets/media/images/grayscale/elite-female-nurse-stethascope.grayscale.png";
// Grayscale subdirectory
import eliteNursesPosing from "../assets/media/images/grayscale/elite-nurses-posing.grayscale.png";
import lovedOneSupport from "../assets/media/images/grayscale/loved-one-giving-patient-support.grayscale.png";
import medicalProfessionalCouch from "../assets/media/images/grayscale/medica-professional-couch.grayscale.png";
import reviewingMedicalDocs from "../assets/media/images/grayscale/reviewing-medical-docs.grayscale.png";
import reviewingNutrition from "../assets/media/images/grayscale/reviewing-nutrition-diet.grayscale.png";
// Muted subdirectory
import antiqueCouchNursePatient from "../assets/media/images/muted/antique-couch-nurse-patient.muted.png";
import holdingHands from "../assets/media/images/muted/holding-hands.muted.png";
import twentyFourHourCareTall from "../assets/media/images/muted/twenty-four-hour-care-tall.muted.png";
// Medical/Care Images
import nurseAdjustingIV from "../assets/media/images/nurse-adjusting-iv-medication.png";
import nurseCheckingBreathing from "../assets/media/images/nurse-checking-patient-breathing.png";
import nurseCheckingBreathingWide from "../assets/media/images/nurse-checking-patient-breathing.wide.png";
import partialPalmTreeDusk from "../assets/media/images/partial-palm-tree-frawns-at-dusk.png";
import rockyShorlineWaves from "../assets/media/images/rocky-shoreline-waves.png";
import scenicBeachCalmWaves from "../assets/media/images/scenic-beach-calm-waves-cove-cliffs.png";
import topDownRockyBeach from "../assets/media/images/top-down-view-of-rocky-beach.png";

/**
 * Map of image paths to imported URLs for dynamic lookups.
 * Allows converting /assets/media/images/filename.png to the bundled URL.
 */
export const imagePathMap = {
	"/assets/media/images/birds-eye-view-of-coastal-town.png":
		birdsEyeViewCoastalTown,
	"/assets/media/images/blue-green-waves-brown-beach.png":
		blueGreenWavesBrownBeach,
	"/assets/media/images/partial-palm-tree-frawns-at-dusk.png":
		partialPalmTreeDusk,
	"/assets/media/images/rocky-shoreline-waves.png": rockyShorlineWaves,
	"/assets/media/images/scenic-beach-calm-waves-cove-cliffs.png":
		scenicBeachCalmWaves,
	"/assets/media/images/top-down-view-of-rocky-beach.png": topDownRockyBeach,
	"/assets/media/images/nurse-adjusting-iv-medication.png": nurseAdjustingIV,
	"/assets/media/images/nurse-checking-patient-breathing.png":
		nurseCheckingBreathing,
	"/assets/media/images/nurse-checking-patient-breathing.wide.png":
		nurseCheckingBreathingWide,
	"/assets/media/images/grayscale/elite-nurses-posing.grayscale.png":
		eliteNursesPosing,
	"/assets/media/images/grayscale/reviewing-medical-docs.grayscale.png":
		reviewingMedicalDocs,
	"/assets/media/images/grayscale/elite-female-nurse-stethascope.grayscale.png":
		eliteFemaleNurse,
	"/assets/media/images/grayscale/loved-one-giving-patient-support.grayscale.png":
		lovedOneSupport,
	"/assets/media/images/grayscale/medica-professional-couch.grayscale.png":
		medicalProfessionalCouch,
	"/assets/media/images/grayscale/reviewing-nutrition-diet.grayscale.png":
		reviewingNutrition,
	"/assets/media/images/muted/antique-couch-nurse-patient.muted.png":
		antiqueCouchNursePatient,
	"/assets/media/images/muted/holding-hands.muted.png": holdingHands,
	"/assets/media/images/muted/twenty-four-hour-care-tall.muted.png":
		twentyFourHourCareTall,
};

/**
 * Resolve an image path to its bundled URL.
 * @param {string} path - The original image path (e.g., "/assets/filename.png")
 * @returns {string} The bundled URL with content hash
 */
export function resolveImagePath(path) {
	return imagePathMap[path] || path;
}
