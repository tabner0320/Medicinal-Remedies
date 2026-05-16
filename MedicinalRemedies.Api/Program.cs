var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

List<Remedy> remedies = new()
{
    new Remedy
    {
        Id = 1,
        Symptom = "headache",
        Name = "Peppermint Tea",
        Ingredients = "Peppermint leaves, hot water",
        Instructions = "Steep peppermint leaves in hot water for 5 minutes."
    },
    new Remedy
    {
        Id = 2,
        Symptom = "cold",
        Name = "Honey Lemon Drink",
        Ingredients = "Honey, lemon, warm water",
        Instructions = "Mix honey and lemon into warm water and drink slowly."
    }
};

app.MapGet("/api/remedies", () =>
{
    return remedies;
});

app.MapGet("/api/remedies/{id}", (int id) =>
{
    var remedy = remedies.FirstOrDefault(r => r.Id == id);

    return remedy is not null
        ? Results.Ok(remedy)
        : Results.NotFound();
});

app.MapGet("/api/remedies/symptom/{symptom}", (string symptom) =>
{
    var matches = remedies
        .Where(r => r.Symptom.Equals(symptom, StringComparison.OrdinalIgnoreCase))
        .ToList();

    return matches.Count > 0
        ? Results.Ok(matches)
        : Results.NotFound();
});

app.Run();

public class Remedy
{
    public int Id { get; set; }
    public string Symptom { get; set; } = "";
    public string Name { get; set; } = "";
    public string Ingredients { get; set; } = "";
    public string Instructions { get; set; } = "";
}