module ApplicationHelper
  def log_in!(user)
    user.reset_session_token!
    @current_user = user;
    session[:session_token] = user.session_token
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def current_user=(user)
    @current_user = user
  end

  def log_out!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  def require_login
    redirect_to landing_url unless logged_in?
  end
end