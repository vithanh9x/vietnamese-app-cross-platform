package com.example.vietnameseapp.screens

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.vietnameseapp.R
import java.text.SimpleDateFormat
import java.util.*

data class ClockItem(
    val id: String,
    val timezone: String,
    val label: String
)

class DigitalClockFragment : Fragment() {
    
    private lateinit var clocksContainer: LinearLayout
    private lateinit var btnAddClock: Button
    private lateinit var btnToggleFormat: Button
    private lateinit var btnToggleLanguage: Button
    
    private var clocks = mutableListOf(
        ClockItem("1", "Asia/Ho_Chi_Minh", "Vietnam"),
        ClockItem("2", "Asia/Tokyo", "Japan"),
        ClockItem("3", "America/New_York", "New York")
    )
    
    private var format24h = true
    private val handler = Handler(Looper.getMainLooper())
    private val updateRunnable = object : Runnable {
        override fun run() {
            updateAllClocks()
            handler.postDelayed(this, 1000)
        }
    }
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_digital_clock, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        clocksContainer = view.findViewById(R.id.clocks_container)
        btnAddClock = view.findViewById(R.id.btn_add_clock)
        btnToggleFormat = view.findViewById(R.id.btn_toggle_format)
        btnToggleLanguage = view.findViewById(R.id.btn_toggle_language)
        
        btnAddClock.setOnClickListener {
            addNewClock()
        }
        
        btnToggleFormat.setOnClickListener {
            format24h = !format24h
            updateAllClocks()
            updateFormatButton()
        }
        
        btnToggleLanguage.setOnClickListener {
            toggleLanguage()
        }
        
        displayClocks()
        updateFormatButton()
        handler.post(updateRunnable)
    }
    
    private fun displayClocks() {
        clocksContainer.removeAllViews()
        clocks.forEach { clock ->
            val clockView = createClockView(clock)
            clocksContainer.addView(clockView)
        }
    }
    
    private fun createClockView(clock: ClockItem): View {
        val view = LinearLayout(requireContext()).apply {
            orientation = LinearLayout.VERTICAL
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                setMargins(16, 16, 16, 16)
            }
            setBackgroundColor(resources.getColor(R.color.clock_card_bg))
            elevation = 8f
            setPadding(20, 20, 20, 20)
        }
        
        // Label
        val label = TextView(requireContext()).apply {
            text = clock.label
            textSize = 20f
            setTextColor(resources.getColor(R.color.text_primary))
        }
        
        // Timezone
        val timezone = TextView(requireContext()).apply {
            text = clock.timezone
            textSize = 14f
            setTextColor(resources.getColor(R.color.text_secondary))
        }
        
        // Time Display
        val timeDisplay = TextView(requireContext()).apply {
            tag = "time_${clock.id}"
            textSize = 36f
            setTextColor(resources.getColor(R.color.text_primary))
            typeface = android.graphics.Typeface.MONOSPACE
        }
        
        // Remove Button
        val btnRemove = Button(requireContext()).apply {
            text = "Remove"
            setOnClickListener {
                removeClock(clock.id)
            }
        }
        
        view.addView(label)
        view.addView(timezone)
        view.addView(timeDisplay)
        view.addView(btnRemove)
        
        return view
    }
    
    private fun updateAllClocks() {
        clocks.forEach { clock ->
            val timeView = clocksContainer.findViewWithTag<TextView>("time_${clock.id}")
            if (timeView != null) {
                timeView.text = getTimeInTimezone(clock.timezone)
            }
        }
    }
    
    private fun getTimeInTimezone(timezone: String): String {
        val tz = TimeZone.getTimeZone(timezone)
        val calendar = Calendar.getInstance(tz)
        val format = if (format24h) "HH:mm:ss" else "hh:mm:ss a"
        val sdf = SimpleDateFormat(format, Locale.getDefault())
        sdf.timeZone = tz
        return sdf.format(calendar.time)
    }
    
    private fun addNewClock() {
        val newId = System.currentTimeMillis().toString()
        clocks.add(ClockItem(newId, "UTC", "New Clock"))
        displayClocks()
    }
    
    private fun removeClock(id: String) {
        clocks.removeAll { it.id == id }
        displayClocks()
    }
    
    private fun updateFormatButton() {
        btnToggleFormat.text = if (format24h) "12H" else "24H"
    }
    
    private fun toggleLanguage() {
        // Implementation for language toggle
        // Will integrate with i18n system
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        handler.removeCallbacks(updateRunnable)
    }
}
