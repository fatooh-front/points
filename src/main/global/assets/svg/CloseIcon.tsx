const BenEditCloseIcon = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 18L18 6"
      stroke={props.stroke || "#162A2B"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18 18L6 6"
      stroke={props.stroke || "#162A2B"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default BenEditCloseIcon;
