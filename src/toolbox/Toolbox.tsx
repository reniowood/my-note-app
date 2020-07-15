import React from 'react';
import styles from './Toolbox.module.css';
import ToolboxBlockTypeButton from './ToolboxBlockTypeButton';

export default function Toolbox() {
  return (
    <div className={styles.toolbox}>
      <ToolboxBlockTypeButton
        blockType="text"
        materialIconName="format_align_justify"
      />
      <ToolboxBlockTypeButton
        blockType="heading1"
        materialIconName="looks_one"
      />
      <ToolboxBlockTypeButton
        blockType="heading2"
        materialIconName="looks_two"
      />
      <ToolboxBlockTypeButton
        blockType="heading3"
        materialIconName="looks_3"
      />
      <ToolboxBlockTypeButton
        blockType="unorderedList"
        materialIconName="format_list_bulleted"
      />
      <ToolboxBlockTypeButton
        blockType="orderedList"
        materialIconName="format_list_numbered"
      />
      <ToolboxBlockTypeButton
        blockType="checkbox"
        materialIconName="check_box"
      />
      <ToolboxBlockTypeButton
        blockType="toggleList"
        materialIconName="arrow_drop_down"
      />
    </div>
  );
}
