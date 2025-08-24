import React, { useEffect, useRef, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import JoditEditor, { Jodit } from "jodit-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import "./styles/TextEditorStyle.css";
type TextEditorProps = {
  name: string;
  form: any; // This should be typed as `UseFormReturn` from `react-hook-form` if preferred
  label?: string;
  labelClassName?: string;
  FormDescriptionClaasName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  [key: string]: any;
};

const TextEditor: React.FC<TextEditorProps> = ({
  name,
  form,
  label,
  labelClassName,
  disabled = false,
  readOnly = false,
  FormDescriptionClaasName,
  ...props
}) => {
  const editorRef = useRef<Jodit | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const { i18n } = useTranslation();
  const config: any = useMemo(() => {
    return {
      readonly: readOnly,
      disabled: disabled,
      placeholder: props.placeholder || "Start typing...",
      toolbarSticky: !readOnly, // Disable sticky toolbar in read-only mode
      editorReady: () => setEditorReady(true),
      direction: i18n.language === "ar" ? "rtl" : "ltr",
      language: i18n.language,
      toolbarButtonSize: "small",
    };
  }, [readOnly, i18n.language]);

  useEffect(() => {
    if (editorReady && editorRef.current && readOnly) {
      const editorContent = editorRef.current.container.querySelector(
        ".jodit-wysiwyg"
      ) as HTMLElement | null;

      if (editorContent) {
        editorContent.style.borderRadius = "7px";
      }
    }
  }, [editorReady, readOnly]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          className={cn(
            "block leading-none              text-[#8E8E8E]  font-normal text-lg",
            labelClassName
          )}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="w-full editor-container">
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => (
            <JoditEditor
              ref={editorRef}
              config={config}
              value={field.value}
              onChange={(content) => field.onChange(content)}
              className={"w-full overflow-auto"}
              i18nIsDynamicList
              {...props}
            />
          )}
        />
      </div>{" "}
      {form?.formState?.errors?.[name]?.message && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors[name].message}
        </p>
      )}
    </div>
  );
};

export default TextEditor;
