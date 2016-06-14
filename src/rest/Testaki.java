package rest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/test")
public class Testaki {

	@GET
	@Produces("text/plain")
	public String getClichedMessage() {
		return "Testaki";
	}
}