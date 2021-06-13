import {Button} from "bootstrap";
import {useAccordionToggle} from "react-bootstrap";

const BootstrapAccordionToggle = ({
  children,
  eventKey,
  onClick = () => {},
  variant,
  className,
  style,
}) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () => onClick());

  return (
    <Button
      variant={variant || ""}
      style={style || undefined}
      className={className || ""}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
};

export default BootstrapAccordionToggle;
