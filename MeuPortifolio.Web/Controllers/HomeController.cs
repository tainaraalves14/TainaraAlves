using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MeuPortifolio.Web.Models;

namespace MeuPortifolio.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

   // Ação que renderiza a página Sobre
    public IActionResult About()
    {
        return View();  // Retorna a view 'About' (que vamos criar em seguida)
    }

     public IActionResult Projects()  // Nova action para Projetos
    {
        return View();  // Retorna a view 'Projects' que vamos criar em seguida
    }

    public IActionResult Contact()  // Action para Contato
    {
        return View();  // Retorna a view 'Contact' que vamos criar também
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
