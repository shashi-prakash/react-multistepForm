import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const [formStep, setFormStep] = useState(0);
  const [backFormStep, setBackFormStep] = useState(0);

  const {watch, register, formState:{errors, isValid}} = useForm({mode:"all"});

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const undoFormStep = () => {
    setFormStep((cur) => cur + -1);
  };
  const renderButton = () => {
    if (formStep > 2) {
      return undefined;
    } else if (formStep === 2) {
      return (
        <>
        <div className="button-section margin-bottom pb-10">
          <button disabled={!isValid} type="button" onClick={completeFormStep}>
            Create Account{" "}
          </button>
        </div>
        <div className="button-section margin-bottom pb-10">
          <button type="button" onClick={undoFormStep}>
            Back{" "}
          </button>
        </div>
        </>
      );
    } else {
      return (
       
        <div className="button-section margin-bottom pb-10">
          <button disabled={!isValid} type="button" onClick={completeFormStep}>
            Next Step
          </button>
        </div>
      );
    }
  };
  return (
    <>
      <section className="form-section">
        <div className="form-container">
          <form>
            {formStep >= 0 && (
              <div className={formStep === 0 ? "block" : "hidden"}>
                <div className="personal-info margin-bottom">
                <h2>Personal Information</h2>
                <label htmlFor="username">Username</label>
                <input type="text"  name="username" id="username"
                 {...register("username", { required:{
                  message:"Please type username",
                value:true },
                 })}
                />
               {errors.username && <p>{errors.username.message}</p>}
              </div>
              </div>
            )}
            {formStep >= 1 && (
              <div className={formStep === 1 ? "block" : "hidden"}>
              <div className="address-info margin-bottom">
                <h2>Billing Information</h2>
                <label htmlFor="">Address</label>
                <input type="checkbox"  className="cl-custom-radio"/>
              </div>
              </div>
              
            )}
            {formStep >= 3 && (
              <div className={formStep === 3 ? "block" : "hidden"}>
              <div className="legal-info margin-bottom">
                <h2>Legal Information</h2>
                <div className="terms pb-5">
                  <input type="checkbox" />
                  <label for="vehicle1" style={{ display: "inline" }}>
                    I accept the &nbsp;&nbsp;<a href="">Terms and conditions</a>
                  </label>
                </div>
                <div className="privacy">
                  <input type="checkbox" />
                  <label for="vehicle1" style={{ display: "inline" }}>
                    {" "}
                    I accept the &nbsp;&nbsp;<a href="">Privacy policy</a>
                  </label>
                </div>
              </div>
              </div>
            )}
            {formStep === 3 && (
              <div className="address-info margin-bottom">
                <h2>Congratulation</h2>
              </div>
            )}
            {renderButton()}
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
