export class ErrorHandler {
  static error400(err, req, res) {
    return res.status(400).json({ status: 400, error: err.message });
  }

  static error404(err, req, res) {
    return res.status(404).json({ status: 404, error: "No encontrado" });
  }

  static error500(err, req, res) {
    return res.status(500).json({ status: 500, error: err.message });
  }
}
