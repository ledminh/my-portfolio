import ErrorLayout from "./ErrorLayout";

import SignIn from "./form/Form.SignIn";

export default function UnAuthenticateScreen() {
  return (
    <ErrorLayout>
      <p className="text-xl font-semibold">
        You are not authorized to access this area.
      </p>
      <p className="font-semibold">Please sign in first</p>
      <div className="shadow-xl">
        <SignIn />
      </div>
    </ErrorLayout>
  );
}
