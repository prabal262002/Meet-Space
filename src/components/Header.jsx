

const Header = () => {

  return (
    <header className="bg-white border-bottom py-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-auto">
            <h1
              className="mb-0"
              style={{ color: "#E91E63", fontSize: "28px", fontWeight: "bold" }}
            >
              MeetSpace
            </h1>
          </div>

          <div className="col flex-grow-1 mx-4">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search by title and type..."
              style={{ backgroundColor: "#f5f5f5" }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
