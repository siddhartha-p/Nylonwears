function MessageBox(props) {
  return (
    <div className={`alert ${props.variant || 'alert-info'}`} role="alert">
      {props.children}
    </div>
  );
}

export default MessageBox;
