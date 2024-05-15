import styled from '@emotion/styled';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 4px;
  color: #333;
  input-top: 10px;
  background: transparent;
  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const InputField = ({
  label,
  type,
  value,
  onChange,
  onClick,
  placeholder,
  readOnly,
}) => (
  <InputWrapper>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </InputWrapper>
);

export default InputField;
