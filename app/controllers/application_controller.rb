class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  # TODO: find prevent forgery solution.
  helper_method :current_user

  # TODO: Get new stripe key
  Stripe.api_key = ''

  Slack.configure do |config|
    config.token = ''
    fail 'Missing ENV[SLACK_API_TOKEN]!' unless config.token
  end


  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.includes(:flags, :projects, :cohorts).find_by_session_token(session[:session_token])
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def sign_out
    session[:session_token] = nil
    current_user.try(:reset_token!)
  end
end
