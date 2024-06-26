import metadataGroupProps from "./props/MetadataGroupProps";
import metadataFormProps from "./props/MetadataFormProps";

import { is } from "bpmn-js/lib/util/ModelUtil";

const LOW_PRIORITY = 500;

/**
 * A provider with a `#getGroups(element)` method
 * that exposes groups for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function CustomPropertiesProvider(propertiesPanel, translate) {
  /**
   * Return the groups provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  this.getGroups = function (element) {
    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */

    return function (groups) {
      // Add the "Metadata" group
      if (is(element, "bpmn:UserTask")) {
        groups.push(createMetadataGroup(element, translate));
        groups.push(createMetadataGroupForm(element, translate));
      }

      return groups;
    };
  };

  // Register custom properties provider.
  // Use a lower priority to ensure it is loaded after
  // the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

CustomPropertiesProvider.$inject = ["propertiesPanel", "translate"];

// Create the custom Metadata group
function createMetadataGroup(element, translate) {
  // create a group called "Metadata".
  const metadataGroup = {
    id: "metadata",
    label: translate("Group/User"),
    entries: metadataGroupProps(element),
  };

  return metadataGroup;
}

// Create the custom Metadata  form
function createMetadataGroupForm(element, translate) {
  // create a group called "Metadata".
  const metadataGroup = {
    id: "metadataForm",
    label: translate("Forms"),
    entries: metadataFormProps(element),
  };

  return metadataGroup;
}
