/**
 * Module exporting Auth Type enum
 * @module AuthEnum
 * @author JJ
 *
 * @notice Define an enum of all authentication requirements types possible for the routes.
 * @notice When performing checks and running router gaurd functions, check against this AuthType enum.
 * @notice The Enum object is frozen to prevent it from getting modified.
 *
 * @notice Auth types:
 * @notice public: User can access this route regardless of his/her current auth status.
 * @notice public_only: Only accessible if user is not logged in. Example would be the login route.
 * @notice private: Only accessible if user is currently authenticated.
 */
export default Object.freeze({
  public: 1,
  public_only: 2,
  private: 3
});
