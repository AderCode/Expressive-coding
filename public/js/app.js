document.body.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col-sm-7 mx-auto">
                <form action="/team-name-submitted/" method="POST">
                    <div class="form-group">
                        <label for="team_name">Team Name:</label>
                        <input type="text" class="form-control my-1" id="team_name" name="team_name" placeholder="What team!?" />           
                        <input type="submit" class="btn btn-primary my-1" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;

console.log(`Script end.`);
