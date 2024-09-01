import classes from "./Home.module.css";

const Testimonials = () => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 text-center">
          <img
            src="https://deleoye.ng/wp-content/uploads/2016/11/Dummy-image.jpg"
            alt=""
            className={classes.test_image}
          />

          <h3>Seide Ashimi</h3>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil at
            quia, cumque mollitia harum amet quae dolor inventore voluptate
            numquam qui atque architecto magnam, unde quo sint in repellat
            tempora.</p>
        </div>
        <div className="col-md-2"></div>
      </div>
    </section>
  );
};

export default Testimonials;
