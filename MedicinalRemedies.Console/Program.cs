using System.Text.Json;

Console.WriteLine("=== Medicinal Remedies Console App ===");

using HttpClient client = new HttpClient();

try
{
    string url = "http://localhost:5000/api/remedies";

    string json = await client.GetStringAsync(url);

    List<Remedy>? remedies = JsonSerializer.Deserialize<List<Remedy>>(
        json,
        new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

    if (remedies == null || remedies.Count == 0)
    {
        Console.WriteLine("No remedies found.");
        return;
    }

    Console.WriteLine("\nAvailable Remedies:\n");

    foreach (Remedy remedy in remedies)
    {
        Console.WriteLine($"ID: {remedy.Id}");
        Console.WriteLine($"Symptom: {remedy.Symptom}");
        Console.WriteLine($"Name: {remedy.Name}");
        Console.WriteLine($"Ingredients: {remedy.Ingredients}");
        Console.WriteLine($"Instructions: {remedy.Instructions}");
        Console.WriteLine("-----------------------------------");
    }
}
catch (HttpRequestException ex)
{
    Console.WriteLine("Error connecting to API.");
    Console.WriteLine(ex.Message);
}
catch (Exception ex)
{
    Console.WriteLine("Unexpected error.");
    Console.WriteLine(ex.Message);
}

public class Remedy
{
    public int Id { get; set; }
    public string Symptom { get; set; } = "";
    public string Name { get; set; } = "";
    public string Ingredients { get; set; } = "";
    public string Instructions { get; set; } = "";
}