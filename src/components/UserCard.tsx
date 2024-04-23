import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { getUserData } from "../api/actions";

// User search GUI
const UserCard: React.FC = () => {
  const [data, setData] = useState<SocialMediaData>();
  const [loadingState, setLoadingState] = useState(false);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching User Data...");
    console.log(user);
    setLoadingState(true);
    getUserData(user)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };
  // Displays user details after API call
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="username"
              type="text"
              label="User"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <img src={data.pfp} width={34} height={34}></img>
            <h1 className="text-3xl font-bold">{data.username}</h1>
            <h1 className="text-3xl font-bold">statistics:</h1>
            <p className="text-lg">Follower Count: {data.followercount}</p>
            <p className="text-lg">Following Count: {data.followingcount}</p>
            <p className="text-lg">Number of Posts: {data.postsnum}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a user</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
